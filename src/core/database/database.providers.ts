import { Sequelize } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { OrderDetail } from 'src/orderDetail/orderDetail.model';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Product, Order, OrderDetail]);
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];
