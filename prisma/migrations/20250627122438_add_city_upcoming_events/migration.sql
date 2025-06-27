-- AlterTable
ALTER TABLE `upcoming_events` ADD COLUMN `city_id` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `upcoming_events` ADD CONSTRAINT `upcoming_events_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
