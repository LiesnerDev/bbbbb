using Xunit;
using Moq;
using Employee.API.Controllers;
using Employee.Application.Employees.Services;
using Employee.Application.Employees.Models;
using Employee.Domain.SeedWork;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Employee.Application.Employees.Tests.Controllers
{
    public class EmployeeControllerTests
    {
        private readonly Mock<IEmployeeService> _mockEmployeeService;
        private readonly Mock<INotification> _mockNotification;
        private readonly EmployeeController _controller;

        public EmployeeControllerTests()
        {
            _mockEmployeeService = new Mock<IEmployeeService>();
            _mockNotification = new Mock<INotification>();
            _controller = new EmployeeController(_mockEmployeeService.Object, _mockNotification.Object);
        }

        [Fact]
        public async Task Post_ValidEmployee_ReturnsSuccessResponse()
        {
            // Arrange
            var employeeRequest = new EmployeeRequest
            {
                Id = 1234,
                Name = "JohnDoe",
                Age = 30,
                Address = "123MainStreet"
            };

            var baseResponse = new BaseResponse { Success = true, Message = "Employee added successfully." };
            _mockEmployeeService.Setup(service => service.AddAsync(employeeRequest)).ReturnsAsync(baseResponse);

            // Act
            var result = await _controller.Post(employeeRequest);

            // Assert
            var okResult = Assert.IsType<IActionResult>(result);
            _mockEmployeeService.Verify(service => service.AddAsync(employeeRequest), Times.Once);
            // Additional assertions can be added based on the implementation of Response method
        }

        [Fact]
        public async Task Post_InvalidId_ReturnsErrorResponse()
        {
            // Arrange
            var employeeRequest = new EmployeeRequest
            {
                Id = 123, // Invalid ID (not 4 digits)
                Name = "JaneDoe",
                Age = 25,
                Address = "456AnotherStreet"
            };

            _controller.ModelState.AddModelError("Id", "ID must be a 4-digit number.");

            // Act
            var result = await _controller.Post(employeeRequest);

            // Assert
            var badRequestResult = Assert.IsType<IActionResult>(result);
            // Additional assertions can be added based on the implementation of Response method
            _mockEmployeeService.Verify(service => service.AddAsync(It.IsAny<EmployeeRequest>()), Times.Never);
        }

        [Fact]
        public async Task Post_InvalidName_ReturnsErrorResponse()
        {
            // Arrange
            var employeeRequest = new EmployeeRequest
            {
                Id = 1234,
                Name = "JaneDoe123456789012345", // Invalid Name (more than 20 characters)
                Age = 25,
                Address = "456AnotherStreet"
            };

            _controller.ModelState.AddModelError("Name", "Name must be up to 20 alphabetic characters.");

            // Act
            var result = await _controller.Post(employeeRequest);

            // Assert
            var badRequestResult = Assert.IsType<IActionResult>(result);
            // Additional assertions can be added based on the implementation of Response method
            _mockEmployeeService.Verify(service => service.AddAsync(It.IsAny<EmployeeRequest>()), Times.Never);
        }

        [Fact]
        public async Task Post_InvalidAge_ReturnsErrorResponse()
        {
            // Arrange
            var employeeRequest = new EmployeeRequest
            {
                Id = 1234,
                Name = "JaneDoe",
                Age = 9, // Invalid Age (not 2 digits)
                Address = "456AnotherStreet"
            };

            _controller.ModelState.AddModelError("Age", "Age must be a two-digit number.");

            // Act
            var result = await _controller.Post(employeeRequest);

            // Assert
            var badRequestResult = Assert.IsType<IActionResult>(result);
            // Additional assertions can be added based on the implementation of Response method
            _mockEmployeeService.Verify(service => service.AddAsync(It.IsAny<EmployeeRequest>()), Times.Never);
        }

        [Fact]
        public async Task Post_InvalidAddress_ReturnsErrorResponse()
        {
            // Arrange
            var employeeRequest = new EmployeeRequest
            {
                Id = 1234,
                Name = "JaneDoe",
                Age = 25,
                Address = "ThisAddressIsWayTooLongToBeValidInTheSystem123" // Invalid Address (more than 30 characters)
            };

            _controller.ModelState.AddModelError("Address", "Address must be up to 30 alphabetic characters.");

            // Act
            var result = await _controller.Post(employeeRequest);

            // Assert
            var badRequestResult = Assert.IsType<IActionResult>(result);
            // Additional assertions can be added based on the implementation of Response method
            _mockEmployeeService.Verify(service => service.AddAsync(It.IsAny<EmployeeRequest>()), Times.Never);
        }
    }
}