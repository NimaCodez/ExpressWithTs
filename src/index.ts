import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';

validateEnv();

const app = new App([new PostController()], Number(process.env.PORT), String(process.env.MONGO_PATH));

app.listen()