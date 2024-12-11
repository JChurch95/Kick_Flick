# 🛹 Kick Flick - Skateboarding Video Database

Kick Flick is a modern web application that serves as a curated database of professional skateboarding videos. The platform allows users to explore video parts from top professional skateboarders, view their profiles, and discover new content. Users can also contribute by submitting new skaters and videos to be added to the database.

## 🌟 Features

### Core Functionality
- **Skater Profile Viewing**:
  - Detailed skater information
  - Professional background
  - Sponsor information
  - Profile pictures
  - Nationality

### Video Management
- **Video Organization**:
  - Chronological video parts
  - YouTube integration
  - Release year tracking
  - Multiple videos per skater
  - Easy video browsing

### User Experience
- **Interactive Interface**: 
  - Skater search functionality
  - Responsive design
  - Clean, modern UI
  - Mobile-friendly layout
  - Custom cursor

### Contact System
- **Content Submission**:
  - New skater suggestions
  - Video submission form
  - Additional information input
  - User contact details

## 🛠 Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bulma CSS Framework
- Custom Fonts (Jolly Lodger)
- YouTube Embed API

### Backend
- Python
- FastAPI
- SQLModel
- PostgreSQL (via Supabase)
- Uvicorn

### Database Schema
- Skaters table
- Videos table
- Pictures table
- Relational data structure

## 🚀 Getting Started

### Prerequisites
- Python (3.8 or higher)
- PostgreSQL database
- Node.js (for development)
- Web browser with JavaScript enabled

### Environment Variables
Create a `.env` file in the project root:

```
DATABASE_URL=your_postgresql_url
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kick-flick.git

# Navigate to project directory
cd kick-flick

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python -m alembic upgrade head

# Start the server
uvicorn main:app --reload
```

## 📊 API Endpoints

### Skater Management
- `GET /api/skaters/`: Get all skaters
- `POST /skaters/`: Create new skater
- `GET /skaters/{skater_id}`: Get specific skater details
- `PUT /skaters/{skater_id}`: Update skater information
- `DELETE /skaters/{skater_id}`: Delete skater

### Video Management
- `GET /api/videos/`: Get videos by skater name
- `POST /videos/`: Add new video
- `PUT /videos/{video_id}`: Update video information
- `DELETE /videos/{video_id}`: Delete video

### Picture Management
- `POST /pictures/`: Add new picture
- `GET /pictures/{picture_id}`: Get specific picture
- `PUT /pictures/{picture_id}`: Update picture
- `DELETE /pictures/{picture_id}`: Delete picture

## 🎨 Design Features
- Custom skateboarding-themed cursor
- Responsive design for all screen sizes
- Dynamic video embedding
- Interactive skater profiles
- Clean, modern UI with Bulma framework
- Custom background styling
- Animated transitions
- Loading states

## 🤝 Contributing
We welcome contributions to Kick Flick! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🛠 Project Structure
```
kick-flick/
├── media/               # Media assets
├── models/             # Database models
├── static/             # Static files
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript files
├── templates/         # HTML templates
├── main.py           # FastAPI application
├── db.py            # Database configuration
└── requirements.txt  # Python dependencies
```

## 🎥 Features in Development
- User authentication
- Favorite videos list
- Advanced search filters
- Social sharing features
- Comment system
- Mobile app version

## 📧 Contact
For any queries or support, please reach out to jordanchurch95@gmail.com

---
Built by Jordan Church
