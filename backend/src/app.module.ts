import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DelayMiddleware } from './delay.service';
import { ServiceModule } from './service/service.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [UserModule, AuthModule, ServiceModule, OrderModule, ChatModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (process.env.NODE_ENV === 'development') {
            consumer.apply(DelayMiddleware).forRoutes('*');
        }
    }
}
