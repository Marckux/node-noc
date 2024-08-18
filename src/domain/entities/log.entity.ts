
export enum LogSeverity {
  low = 'low',
  medium = 'medium',
  high = 'high'
}


export class LogEntity {
  public level: LogSeverity;
  public message: string;
  public timestamp: Date;

  constructor(level: LogSeverity, message: string, timestamp?: string) {
    this.level = level;
    this.message = message;
    if (typeof timestamp !== 'undefined') {
      this.timestamp = new Date(timestamp);
    } else {
      this.timestamp = new Date();
    }
  }

  static fromJson = (json:string): LogEntity => {
    const {level, message, timestamp} = JSON.parse(json);
    return new LogEntity(level, message, timestamp);
  }
}
