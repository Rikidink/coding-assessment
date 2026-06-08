CREATE TABLE `customers` (
	`customerId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_customerId_unique` ON `customers` (`customerId`);--> statement-breakpoint
CREATE TABLE `orders` (
	`orderId` text NOT NULL,
	`customerId` text NOT NULL,
	`item` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_orderId_unique` ON `orders` (`orderId`);