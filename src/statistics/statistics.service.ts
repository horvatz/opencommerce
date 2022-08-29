import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Statistics } from './entities/statistics.entity';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics(): Promise<Statistics> {
    const ordersCount = await this.prisma.checkout.groupBy({
      by: ['status'],
      where: {
        completed: true,
      },
      _count: {
        id: true,
      },
    });

    const productsCount = await this.prisma.product.count({
      where: { active: true },
    });

    const usersCount = await this.prisma.user.count();

    const openOrders =
      ordersCount.find((o) => o.status === 'OPEN')?._count.id || 0;

    const closedOrders =
      ordersCount.find((o) => o.status === 'CLOSED')?._count.id || 0;

    return {
      openOrders,
      closedOrders,
      allOrders: openOrders + closedOrders,
      productsCount: productsCount ?? 0,
      usersCount: usersCount ?? 0,
    };
  }
}
