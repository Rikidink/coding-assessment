CREATE TABLE `customers` (
	`customerId` text PRIMARY KEY NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`orderId` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`item` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON UPDATE no action ON DELETE no action
);
