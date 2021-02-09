
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '../repository/schemas/vendor.schema';

@Controller('vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService) { }

    @Get()
    async getUsers(): Promise<Vendor[]> {
        return this.vendorService.findAll();
    }


    @Post()
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


    @Get(':username')
    async findById(@Res() res, @Param('username') username: string) {
        const Vendor = await this.vendorService.findByUsername(username);
        if (!Vendor) throw new NotFoundException('Login does not exist, or wrong password!');
        return res.status(HttpStatus.OK).json(Vendor);
    }

    @Put(':username')
    async update(@Res() res, @Param('username') username: string, @Body() vendorEdit: Vendor) {
        const vendorResponse = await this.vendorService.update(username, vendorEdit);
        if (!vendorResponse) throw new NotFoundException('Vendorname does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Vendor has been successfully updated',
            vendorResponse
        });
    }

    @Delete(':username')
    async delete(@Res() res, @Param('username') username: string) {
        const vendorResponse = await this.vendorService.delete(username);
        if (!vendorResponse) throw new NotFoundException('Vendor does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Vendor has been deleted',
            vendorResponse
        })
    }

}