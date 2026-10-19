// Define View Templates and Titles
const views = {
    home: `
        <div class="welcome-box">
            <h1>Welcome to Your SPA Simulation</h1>
            <p>This Single Page Application dynamically loads content, manages client-side routes, and maintains seamless transitions without page reloads.</p>
        </div>
        <h2>Quick Overview</h2>
        <div class="card-grid">
            <div class="card">
                <h3>Active Tasks</h3>
                <div class="stat">5 Completed</div>
            </div>
            <div class="card">
                <h3>System Status</h3>
                <div class="stat" style="color: #10b981;">Online</div>
            </div>
            <div class="card">
                <h3>Performance</h3>
                <div class="stat">99.8%</div>
            </div>
        </div>
    `,
    dashboard: `
        <h2>Analytics Dashboard</h2>
        <p style="color: var(--text-muted); margin-top: 4px; margin-bottom: 20px;">Real-time simulation data metrics and project statistics.</p>
        <div class="card-grid">
            <div class="card">
                <h3>Total Visitors</h3>
                <div class="stat">1,429</div>
            </div>
            <div class="card">
                <h3>Bounce Rate</h3>
                <div class="stat">24.3%</div>
            </div>
            <div class="card">
                <h3>Server Response</h3>
                <div class="stat">42ms</div>
            </div>
        </div>
    `,
    profile: `
        <h2>User Profile</h2>
        <p style="color: var(--text-muted); margin-top: 4px; margin-bottom: 20px;">Manage your account details and internship profile info.</p>
        <div class="card" style="max-width: 600px;">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" value="Komalpreet Kaur" readonly>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" value="preeti826@gmail.com" readonly>
            </div>
            <div class="form-group">
                <label>Internship Track</label>
                <input type="text" value="Frontend Web Developer" readonly>
            </div>
            <button class="btn" onclick="alert('Profile changes saved successfully!')">Save Changes</button>
        </div>
    `,
    settings: `
        <h2>Application Settings</h2>
        <p style="color: var(--text-muted); margin-top: 4px; margin-bottom: 20px;">Configure your application preferences.</p>
        <div class="card" style="max-width: 600px;">
            <div class="form-group">
                <label>Theme Mode</label>
                <select>
                    <option>Light Theme</option>
                    <option>Dark Theme (Coming Soon)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notifications</label>
                <select>
                    <option>Enabled</option>
                    <option>Disabled</option>
                </select>
            </div>
            <button class="btn" onclick="alert('Settings updated!')">Update Settings</button>
        </div>
    `
};

const titles = {
    home: "Home Overview",
    dashboard: "Analytics Dashboard",
    profile: "User Profile Management",
    settings: "Application Settings"
};

// Router Function to Handle View Changes
function navigateTo(route, pushState = true) {
    const container = document.getElementById('app-container');
    const titleContainer = document.getElementById('current-view-title');

    // Fallback to home if route doesn't exist
    if (!views[route]) {
        route = 'home';
    }

    // Update Browser History via PushState
    if (pushState) {
        history.pushState({ route }, null, `#${route}`);
    }

    // Trigger Fade Out/In effect
    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = views[route];
        titleContainer.innerText = titles[route];
        container.style.opacity = '1';
    }, 150);

    // Update Active Link styling in sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.route === route) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Event Listeners for Nav Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.dataset.route;
        navigateTo(route);
    });
});

// Handle browser back/forward buttons (popstate)
window.addEventListener('popstate', (e) => {
    const route = e.state ? e.state.route : window.location.hash.replace('#', '') || 'home';
    navigateTo(route, false);
});

// Initial Load on Page Startup
window.addEventListener('DOMContentLoaded', () => {
    const initialRoute = window.location.hash.replace('#', '') || 'home';
    navigateTo(initialRoute, false);
});