using E_commerce.DTOs.User;
using E_commerce.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace E_commerce.Controllers.UserController
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAdminUserService _adminUserService;
        private readonly IUserService _userService;

        public UserController(IAdminUserService adminUserService, IUserService userService)
        {
            _adminUserService = adminUserService;
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create-staff-admin")]
        public async Task<ActionResult> CreateStaffOrAdmin([FromBody] AdminCreateUserRequest dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _adminUserService.CreateStaffOrAdminAsync(dto);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("profile")]
        public async Task<ActionResult> GetProfile()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return Unauthorized("Invalid token or missing identifier.");
            }

            var result = await _userService.GetProfileAsync(userId);
            if (result.IsSuccess) return Ok(result);
            return BadRequest(result);
        }

        [Authorize(Roles = "Customer")]
        [HttpPut("profile")]
        public async Task<ActionResult> UpdateProfile([FromBody] UserProfileUpdateRequest dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return Unauthorized("Invalid token or missing identifier.");
            }

            var result = await _userService.UpdateProfileAsync(userId, dto);
            if (result.IsSuccess) return Ok(result);
            return BadRequest(result);
        }

        [Authorize]
        [HttpDelete("profile")]
        public async Task<ActionResult> DeleteProfile()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return Unauthorized("Invalid token or missing identifier.");
            }

            var result = await _userService.DeleteAccountAsync(userId);
            if (result.IsSuccess) return Ok(result);
            return BadRequest(result);
        }
    }
}
