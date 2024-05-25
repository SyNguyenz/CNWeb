using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace backend.Data
{
    public class NotificationHub : Hub
    {
        private readonly UserManager<User> _userManager;
        public NotificationHub(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task SendMessageToClient(string clientId, string message)
        {
            await Clients.Client(clientId).SendAsync("ReceiveMessage", message);
        }

        public async Task SendMessageToGroup(string groupName, string message)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", message);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
        public async Task SendConnectionIdToServer(string userId, string connectionId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.ConnectionId = connectionId;
                await _userManager.UpdateAsync(user);
            }
        }
    }
}
