import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser, USER_ROLE } from '../user/schemas/user.dto';
import { OrderService } from './order.service';
import { TOrderCreate, TOrderUpdate } from './dto';
import { Review } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAll(@Request() request: RequestWithUser) {
        const { role, id: userId } = request.user;

        if (role === USER_ROLE.USER) {
            return this.orderService.getAll({ clientId: userId });
        }

        return this.orderService.getAll();
    }

    @Post('/review/:id')
    @UseGuards(AuthGuard)
    async createReview(@Param('id', ParseIntPipe) orderId: number, @Body() data: Review) {
        return this.orderService.createReview({
            rating: data.rating,
            text: data.text,
            order: {
                connect: {
                    id: orderId,
                },
            },
        });
    }

    @Get('/review/:driverId')
    @UseGuards(AuthGuard)
    async getReviewsByDriverId(@Param('driverId', ParseIntPipe) driverId: number) {
        return this.orderService.getReviewsByDriverId(driverId);
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    async create(
        @Param('id', ParseIntPipe) serviceId: number,
        @Request() req: RequestWithUser,
        @Body() { address }: TOrderCreate
    ) {
        return this.orderService.create({
            clientId: req.user.id,
            serviceId,
            address,
        });
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id', ParseIntPipe) orderId: number,
        @Request() req: RequestWithUser,
        @Body() dto: TOrderUpdate
    ) {
        return this.orderService.update(orderId, dto.status, req.user.id);
    }
}
