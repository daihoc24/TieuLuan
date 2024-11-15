-- CreateTable
CREATE TABLE `Product` (
    `products_id` INTEGER NOT NULL AUTO_INCREMENT,
    `products_name` VARCHAR(255) NULL,
    `products_image` VARCHAR(255) NULL,
    `products_price` INTEGER NULL,
    `products_comments` VARCHAR(255) NULL,
    `product_type_id` INTEGER NULL,

    PRIMARY KEY (`products_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_product_type_id_fkey` FOREIGN KEY (`product_type_id`) REFERENCES `ProductType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
