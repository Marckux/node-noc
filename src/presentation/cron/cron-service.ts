import {CronJob} from "cron";

type CronTime = string | Date;
type CronTask = () => void;

export class CronService {

    static createJob(cronTime: CronTime, cronTask: CronTask) {
        const job = new CronJob(cronTime, cronTask);
        job.start();
        return job;
    }
}