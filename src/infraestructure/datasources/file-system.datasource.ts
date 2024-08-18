
import {LogDatasource} from '../../domain/datasources/log.datasource';
import fs from 'fs';
import {LogEntity, LogSeverity} from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {

  private readonly logPath = 'logs/';
  private readonly allLogPath = 'logs/logs-low.log';
  private readonly mediumLogPath = 'logs/logs-medium.log';
  private readonly errorLogPath = 'logs/logs-error.log';
  
  constructor() {
    this.createFiles();
  }

  private createFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    const filesToCreate = [this.allLogPath, this.mediumLogPath, this.errorLogPath];
    filesToCreate.forEach((file) =>{
      if (!fs.existsSync(file)) fs.writeFileSync(file, '');
    });
  }

  private getLogsFromFile = (path: string) : LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.split('\n').map(LogEntity.fromJson);
    return logs;
  }

  async saveLog(log: LogEntity): Promise<void> {
    const content = JSON.stringify(log) + '\n';
    fs.appendFileSync(this.allLogPath, content)
    if (log.level == LogSeverity.medium) fs.appendFileSync(this.mediumLogPath, content);
    if (log.level == LogSeverity.high) fs.appendFileSync(this.errorLogPath, content);
    return;
  }
  async getLogs(severityLevel: LogSeverity): Promise<LogEntity[]> {
    
    switch (severityLevel) {
      case LogSeverity.low:
        return this.getLogsFromFile(this.allLogPath);
      case LogSeverity.medium:
        return this.getLogsFromFile(this.mediumLogPath);
      case LogSeverity.high:
        return this.getLogsFromFile(this.errorLogPath);
      default:
        throw new Error(`Severity level: ${severityLevel} does not exist`);
    }
  }
}
