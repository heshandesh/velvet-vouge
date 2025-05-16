# Velvet

A PHP-based web application built with XAMPP.

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

- [List your main features here]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 