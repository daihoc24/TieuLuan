import { ApiBody } from '@nestjs/swagger';

export const ApiFile =
  (fileName: string = 'file'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'file',
            format: 'formData',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };