import { ProductDTO, ProductUpdateDTO } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async createProduct(
    body: ProductDTO,
    res: Response,
  ): Promise<ProductEntity | Response> {
    try {
      const product = await this.productRepository.save(body);
      if (!product) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .header('Created', 'Not Created')
          .json({ message: `product not created` });
      }
      return res
        .status(HttpStatus.CREATED)
        .header('Created', 'product Created')
        .json(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(res: Response): Promise<ProductEntity[] | Response> {
    try {
      const products = await this.productRepository.find();
      if (!products) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Products Not Found')
          .json({ message: `No products on DataBase` });
      }
      return res
        .status(HttpStatus.FOUND)
        .header('Found', `${products.length} products found on DataBase`)
        .json(products);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneById(
    id: number,
    res: Response,
  ): Promise<ProductEntity | Response> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
      if (!product) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Not Found')
          .json({ message: `Product with ID: ${id} do not exist` });
      } else {
        return res
          .status(HttpStatus.FOUND)
          .header('Found', `Product with ID: ${id} found`)
          .json(product);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProduct(
    id: number,
    res: Response,
  ): Promise<ProductEntity | Response> {
    try {
      const product: UpdateResult = await this.productRepository.update(id, {
        isActive: false,
      });
      if (product.affected === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Product not Found')
          .json({
            message: `Product with identification ${id} doesn't found on database`,
          });
      }
      const productDeleted = await this.findOneById(id, res);
      return res
        .status(HttpStatus.OK)
        .header('Deleted', `Product Id: ${id} deleted`)
        .json(productDeleted);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProduct(
    id: number,
    body: ProductUpdateDTO,
    res: Response,
  ): Promise<ProductEntity | Response> {
    try {
      const product: UpdateResult = await this.productRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .header('Found', 'Product not Found')
          .json({
            message: `Product with identification ${id} doesn't found on database`,
          });
      }
      const productUpdated = await this.findOneById(id, res);
      return res
        .status(HttpStatus.OK)
        .header('Updated', `Product Id: ${id} updated`)
        .json(productUpdated);
    } catch (error) {
      throw new Error(error);
    }
  }
}
