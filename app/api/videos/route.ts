import { NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import Video, {IVideo} from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET (){
    try{
        await connectionToDatabase();
        const videos = await Video.find({}).sort({createdAt : -1}).lean();

        if(!videos){
            return NextResponse.json([], {status : 200});

        }

        return NextResponse.json(videos);

    }
    catch (error){
        return NextResponse.json({error :"failed to fetch videos"}, {status : 500});
    }
}


export async function POST (request : NextResponse){
    try{
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({error: "Unauthorized"}, 
                {status : 401}
            );
        }
        await connectionToDatabase();
        const body : IVideo = await request.json();

        // validate the fields

        if(
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ){
            return NextResponse.json({error : "All fields are required"}, {status : 400});
        }
        
        // create the video

        const videosData = {
            ...body,
            controls : body.controls?? true,
            transformation : {
                height : 1920,
                width : 1080,
                quality : body.transformation?.quality??100,
            },

        };

        const newVideo = await Video.create(videosData);
        return NextResponse.json(newVideo, {status : 201});
    }
    catch(error){
        console.error("Error creating video :",error)
        return NextResponse.json({error : "Failed to create video"},
            {status : 500}
        );
    }
}

