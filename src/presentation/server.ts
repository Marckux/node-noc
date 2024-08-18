import {CronService} from './cron/cron-service';
import {CheckService} from '../domain/use-cases/checks/check-service';
import {LogRepositoryImpl} from '../infraestructure/repositories/log.repository.impl';
import {FileSystemDataSource} from '../infraestructure/datasources/file-system.datasource';

// GLOBAL OBJECTS
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {

  public static start() {

    console.log('Server started...');
    const success = ()=>{console.log(`SERVICE UP!`);};
    const fail = (e:string)=>{console.log(`SERVICE DOWN: ${e}`)};

    const job = CronService.createJob(
      '*/5 * * * * *',
      () => {
        new CheckService(fileSystemLogRepository.execute('http://localhost:3001')
          .then(()=>{});
      }
    );
  }
}
