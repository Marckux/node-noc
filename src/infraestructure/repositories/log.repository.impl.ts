
import {LogRepository} from '../../domain/repository/log.repository';
import {LogDatasource} from '../../domain/datasources/log.datasource';
import {LogEntity, LogSeverity} from '../../domain/entities/log.entity';

export class LogRepositoryImpl implements LogRepository {
  constructor (
    private readonly logDataSource: LogDatasource
  ){}
  async saveLog(log: LogEntity) : Promise<void>{
    this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverity) : Promise<LogEntity[]>{
    return this.logDataSource.getLogs(severityLevel);
  }
}
