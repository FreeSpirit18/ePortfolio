SET time_zone = "+00:00";

DROP TABLE IF EXISTS Folder_Post CASCADE;
DROP TABLE IF EXISTS Post_Tag CASCADE;
DROP TABLE IF EXISTS Comment CASCADE;
DROP TABLE IF EXISTS Folder CASCADE;
DROP TABLE IF EXISTS Post CASCADE;


DROP TABLE IF EXISTS Tag CASCADE;
DROP TABLE IF EXISTS User CASCADE;

CREATE TABLE `Post`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `OwnerId` INT UNSIGNED NOT NULL,
    `Likes` BIGINT NOT NULL,
    `Location` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT NOT NULL,
    `CreationDate` DATETIME NOT NULL
);
CREATE TABLE `Tag`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Tag` ADD UNIQUE `tag_name_unique`(`Name`);
CREATE TABLE `Folder_Post`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `FolderId` INT UNSIGNED NOT NULL,
    `PostId` INT UNSIGNED NOT NULL
);
CREATE TABLE `Post_Tag`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `PostId` INT UNSIGNED NOT NULL,
    `TagId` INT UNSIGNED NOT NULL
);
CREATE TABLE `User`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Role` INT NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `JoinDate` DATETIME NOT NULL
);
ALTER TABLE
    `User` ADD UNIQUE `user_email_unique`(`Email`);
ALTER TABLE
    `User` ADD UNIQUE `user_password_unique`(`Password`);
CREATE TABLE `Folder`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `OwnerId` INT UNSIGNED NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT NOT NULL,
    `IsPublic` TINYINT(1) NOT NULL,
    `CreationDate` DATETIME NOT NULL
);
CREATE TABLE `Comment`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `AuthorId` INT UNSIGNED NOT NULL,
    `SubjectId` INT UNSIGNED NOT NULL,
    `Content` TEXT NOT NULL,
    `CreationDate` DATETIME NOT NULL
);
ALTER TABLE
    `Folder_Post` ADD CONSTRAINT `folder_post_postid_foreign` FOREIGN KEY(`PostId`) REFERENCES `Post`(`id`);
ALTER TABLE
    `Post_Tag` ADD CONSTRAINT `post_tag_tagid_foreign` FOREIGN KEY(`TagId`) REFERENCES `Tag`(`id`);
ALTER TABLE
    `Post` ADD CONSTRAINT `post_ownerid_foreign` FOREIGN KEY(`OwnerId`) REFERENCES `User`(`id`);
ALTER TABLE
    `Post_Tag` ADD CONSTRAINT `post_tag_postid_foreign` FOREIGN KEY(`PostId`) REFERENCES `Post`(`id`);
ALTER TABLE
    `Comment` ADD CONSTRAINT `comment_authorid_foreign` FOREIGN KEY(`AuthorId`) REFERENCES `User`(`id`);
ALTER TABLE
    `Comment` ADD CONSTRAINT `comment_subjectid_foreign` FOREIGN KEY(`SubjectId`) REFERENCES `Post`(`id`);
ALTER TABLE
    `Folder_Post` ADD CONSTRAINT `folder_post_folderid_foreign` FOREIGN KEY(`FolderId`) REFERENCES `Folder`(`id`);
ALTER TABLE
    `Folder` ADD CONSTRAINT `folder_ownerid_foreign` FOREIGN KEY(`OwnerId`) REFERENCES `User`(`id`);