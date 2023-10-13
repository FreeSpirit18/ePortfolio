namespace ePortfolioAPI.Auth
{
    public class WebsiteRoles
    {
        public const string Admin = nameof(Admin);
        public const string WebsiteUser = nameof(WebsiteUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, WebsiteUser };
    }
}
