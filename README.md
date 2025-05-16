# Velvet Vogue - Fashion E-Commerce Platform

A modern and feature-rich e-commerce platform built with PHP and MySQL, specifically designed for fashion retail. This application provides a seamless shopping experience for customers and comprehensive management tools for administrators.

## Project Structure

```
├── admin/         # Admin panel files
├── components/    # Reusable components
├── css/          # Stylesheets
├── data/         # Data files
├── images/       # Image assets
├── pages/        # Page templates
├── php/          # PHP scripts
├── script/       # JavaScript files
└── other/        # Miscellaneous files
```

## Requirements

- XAMPP (PHP 7.4 or higher)
- MySQL
- Web browser

## Installation

1. Clone this repository to your XAMPP htdocs directory:
   ```bash
   git clone https://github.com/yourusername/Velvet.git
   ```

2. Start XAMPP Control Panel and ensure Apache and MySQL services are running

3. Database Setup:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named `velvet_vogue`
   - Import the database structure:
     - Click on the `velvet_vogue` database
     - Go to the "Import" tab
     - Click "Choose File" and select `velvet_vogue.sql` from the project directory
     - Click "Go" to import the database structure

4. Access the application through your web browser:
   ```
   http://localhost/Velvet
   ```

## Database Configuration

The database connection settings are configured in the project. The default settings are:
- Database Name: `velvet_vogue`
- Username: `root`
- Password: `` (empty by default in XAMPP)
- Host: `localhost`

If you need to modify these settings, you can find them in the database configuration file.

## Features

### User Features
- User authentication system (login/register)
- Product browsing with categories and subcategories
- Product search and filtering
- Product details view
- Shopping cart functionality
- Contact and support pages
- About page with company information

### Admin Features
- Secure admin dashboard
- Stock management system
  - Add/Edit stock items
  - Track stock quantities
  - Manage product images
  - Set prices and discounts
- Product categorization
  - Main categories
  - Sub-categories
  - Product types
- User role management
- Activity tracking for stock changes

### Technical Features
- Responsive design
- Dark mode support
- Image management system
- Pagination for large datasets
- Real-time search and filtering
- Loading animations
- Secure session management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 