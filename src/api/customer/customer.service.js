import {DatabaseError} from "../../errors/DatabaseError.js";
import {NotFoundError} from "../../errors/NotFoundError.js";
import {Customer} from "./customer.model.js";

class CustomerService {
	async findAllCustomers(page = 1, limit = 10) {
		try {
			const customers = await Customer.find()
				.sort({ name: 1 })
				.skip((page - 1) * limit)
				.limit(limit);
			if (customers.length === 0) {
				throw new NotFoundError("No customers found");
			}
			return customers;
		} catch (error) {
			console.error("Database operation failed", error);
			throw new DatabaseError("Failed to fetch customers");
		}
	}

	async findCustomerById(customerId) {
		try {
			const customer = await Customer.findById(customerId);
			if (!customer) {
				throw new NotFoundError(`Customer with ID ${customerId} not found`);
			}
			return customer;
		} catch (error) {
			console.error(
				`Error retrieving customer with ID: ${customerId}, ${error.message}`,
				error,
			);
			throw new DatabaseError("Database error occurred while retrieving customer");
		}
	}

	async saveCustomer(customer) {
		let savedCustomer = new Customer({
			name: customer.name,
			isGold: customer.isGold,
			phone: customer.phone,
		});

		try {
			savedCustomer = await savedCustomer.save();
			return savedCustomer;
		} catch (error) {
			console.error(`Error saving customer: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while saving customer");
		}
	}

	async updateCustomer(customerId, customer) {
		try {
			const updatedCustomer = await Customer.findByIdAndUpdate(
				customerId,
				{ name: customer.name, isGold: customer.isGold, phone: customer.phone },
				{ new: true },
			);
			if (!updatedCustomer) {
				throw new NotFoundError(`Customer with ID ${customerId} not found`);
			}
			return updatedCustomer;
		} catch (error) {
			console.error(`Error updating customer: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while updating customer");
		}
	}

	async deleteCustomer(customerId) {
		try {
			const customer = await Customer.findByIdAndDelete(customerId);
			if (!customer) {
				throw new NotFoundError(`Customer with ID ${customerId} not found`);
			}
			return customer;
		} catch (error) {
			console.error(`Error deleting customer: ${error.message}`, error);
			throw new DatabaseError("Database error occurred while deleting customer");
		}
	}
}

export default new CustomerService();
