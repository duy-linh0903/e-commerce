using E_commerce.Data;
using E_commerce.DTOs.Staff;
using E_commerce.Services;
using E_commerce.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_commerce.Controllers.StaffController
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;
        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _staffService.GetAllStaff();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _staffService.GetStaffById(id);
            if (result == null)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateStaff staff)
        {
            var result = await _staffService.CreateStaff(staff);
            if (result != "Create successfully")
            {
                return BadRequest(result);
            }
            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateStaff staff)
        {
            var result = await _staffService.UpdateStaff(id, staff);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _staffService.DeleteStaff(id);
            return Ok(result);
        }
    }
}
