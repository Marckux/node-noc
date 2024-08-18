
import {LogRepository} from '../../repository/log.repository';
import {LogEntity, LogSeverity} from '../../entities/log.entity';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

  constructor (
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ){}

  public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity(LogSeverity.low, `Service ${url} working.`);
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity(LogSeverity.high, `Service ${url} is not working. Error: ${errorMessage}`);
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
  }

}
