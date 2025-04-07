import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { Admin, AdminDocument } from 'src/admin/model/admin.schema';
import { CreateStoreDto } from 'src/store/dto/create_store.dto';
import { UpdateStoreDto } from 'src/store/dto/update_store.dto';
import { CreateCustomerDto } from 'src/customer/dto/create_customer.dto';
import { CustomerDocument } from 'src/customer/model/customer.schema';

@Injectable()
export class AdminRepository {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) {}

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async create(admin: CreateAdminDto) {
    const newAdmin = await new this.adminModel({
      _id: new Types.ObjectId(),
      ...admin,
    }).save();

    return newAdmin;
  }

  async findOne(id: string) {
    return await this.adminModel.findOne({ _id: id }).lean<Admin>(true);
  }

  async updateOne(id: string, adminOld: Admin, adminNew: UpdateAdminDto) {
    const updateAdmin = await this.adminModel.findOneAndUpdate(
      { _id: id },
      adminNew,
      {
        new: true,
      },
    );

    return updateAdmin;
  }

  async deleteOne(id: string) {
    return await this.adminModel.findOneAndDelete({ _id: id });
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.adminModel
      .find(keyword ? { $or: [{ ten: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ ten: sort })
      .limit(limit)
      .lean<Admin[]>(true);
  }

  async findAllGetName() {
    return await this.adminModel.find().lean<Admin[]>(true);
  }
}