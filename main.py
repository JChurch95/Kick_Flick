import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import Field, Session, select, SQLModel
from db import get_session
from models.skaters import Skater
from models.videos import Video
from models.pictures import Picture

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the media directory
app.mount("/media", StaticFiles(directory="media"), name="media")

# Operations
@app.get("/")
def root():
    return {"message": "Do a kick flip!"}

# Create
def create_generic(model):
    def create(item: model, session: Session = Depends(get_session)):
        session.add(item)
        session.commit()
        session.refresh(item)
        return item
    return create

# Read
def read_generic(model):
    def read(item_id: int, session: Session = Depends(get_session)):
        return session.get(model, item_id)
    return read

# Update
def update_generic(model):
    def update(item_id: int, item: model, session: Session = Depends(get_session)):
        db_item = session.get(model, item_id)
        if db_item:
            item_data = item.model_dump(exclude_unset=True)
            for key, value in item_data.items():
                setattr(db_item, key, value)
            session.add(db_item)
            session.commit()
            session.refresh(db_item)
            return db_item
        return {"error": f"{model.__name__} with id {item_id} not found"}
    return update

# Delete
def delete_generic(model):
    def delete(item_id: int, session: Session = Depends(get_session)):
        item = session.get(model, item_id)
        if item:
            session.delete(item)
            session.commit()
        return {"ok": True}
    return delete

@app.get("/api/videos/")
async def get_videos(skater: str, db: Session = Depends(get_session)):
    try:
        query = select(Video, Skater, Picture).join(Skater, Video.skater_id == Skater.id).outerjoin(Picture, Skater.id == Picture.skater_id).where(Skater.skater_name.ilike(f"%{skater}%"))
        
        results = db.exec(query).all()
        
        if not results:
            raise HTTPException(status_code=404, detail=f"No videos found for skater: {skater}")
        
        return [{
            "video_name": video.video_name,
            "video_date": video.video_date,
            "youtube_url": video.youtube_url,
            "skater_name": skater.skater_name,
            "nationality": skater.nationality,
            "brand": skater.brand,
            "bio": skater.bio,
            "skater_picture": picture.skater_picture if picture else None
        } for video, skater, picture in results]
    except Exception as e:
        print(f"Error in get_videos: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/skaters/")
async def get_skaters(db: Session = Depends(get_session)):
    try:
        query = select(Skater)
        results = db.exec(query).all()
        return [{"skater_name": skater.skater_name} for skater in results]
    except Exception as e:
        print(f"Error in get_skaters: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Skaters CRUD
app.post("/skaters/")(create_generic(Skater))
app.get("/skaters/{item_id}")(read_generic(Skater))
app.put("/skaters/{item_id}")(update_generic(Skater))
app.delete("/skaters/{item_id}")(delete_generic(Skater))

# Videos CRUD
app.post("/videos/")(create_generic(Video))
app.get("/videos/{item_id}")(read_generic(Video))
app.put("/videos/{item_id}")(update_generic(Video))
app.delete("/videos/{item_id}")(delete_generic(Video))

# Run the app
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)