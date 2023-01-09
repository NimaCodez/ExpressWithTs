import { cleanEnv, str, port } from "envalid";

function validateEnv() : void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_PATH: str({}),
        PORT: port({
            default: 3000
        })
    })
}

export default validateEnv;
