import {Server} from "./presentation/server";

/* To detlete */
import {LogEntity, LogSeverity} from "./domain/entities/log.entity";
import {FileSystemDataSource} from "./infraestructure/datasources/file-system.datasource";

import 'dotenv/config';
import {envs} from './config/env.plugin';

const main = () =>{
    // Server.start();
    console.log(envs);
}

(()=>{
    main();
})()
