
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '../repository/schemas/vendor.schema';

@Controller('vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService) { }

    @Get()
    async getUsers(): Promise<Vendor[]> {
        return this.vendorService.findAll();
    }


    @Post('/create')
    async addCustomer(@Res() res, @Body() Vendor: Vendor) {
        const newVendor = await this.vendorService.create(Vendor);
        return res.status(HttpStatus.OK).json({
            message: "Vendor has been created successfully",
            newVendor
        })
    }

    @Get()
    async getVendors(): Promise<Vendor[]> {
        return this.vendorService.findAll();
    }


    @Get('findByUsername')
    async findById(@Res() res, @Query('username') username: string) {
        const Vendor = await this.vendorService.findByUsername(username);
        if (!Vendor) throw new NotFoundException('Login does not exist, or wrong password!');
        return res.status(HttpStatus.OK).json(Vendor);
    }

    @Put('/update')
    async update(@Res() res, @Query('username') username: string, @Body() VendorEdit: Vendor) {
        const VendorResponse = await this.vendorService.update(username, VendorEdit);
        if (!VendorResponse) throw new NotFoundException('Vendorname does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Vendor has been successfully updated',
            VendorResponse
        });
    }

    @Delete('/delete')
    async delete(@Res() res, @Query('Vendorname') Vendorname: string) {
        const VendorResponse = await this.vendorService.delete(Vendorname);
        if (!VendorResponse) throw new NotFoundException('Vendor does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Vendor has been deleted',
            VendorResponse
        })
    }

}