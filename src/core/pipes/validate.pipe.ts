import { Injectable, ArgumentMetadata, BadRequestException, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
   public async transform(value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata);
      } catch (e) {
         if (e) {
            throw new UnprocessableEntityException(this.handleError(e.response));
         }
      }
   }

   private handleError(errors) {
        return errors.message.map(error => error);
   }
}