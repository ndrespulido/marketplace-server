
import { Controller, Get } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from '../repository/schemas/vendor.schema';

@Controller('vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService) { }

    @Get()
    async getUsers(): Promise<Vendor[]> {
        return this.vendorService.findAll();
    }
}