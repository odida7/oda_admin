import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest)=>{
    try{
        const userId = auth();

        if(!userId){
            return new NextResponse('Unathurized credentials', {status: 403})
        }

   
        await connectToDB()

        const {title, description, image} = await req.json();

        const existingCollection = await Collection.findOne({ title })

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 })
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    })

    await newCollection.save()

    return NextResponse.json(newCollection, { status: 200 })

    }catch(err:any){
        console.log('[collection_POST]',err.message)
        return new NextResponse('Internal Server Error', {status: 500})
    }
}   


export const GET = async (req: NextRequest) => {
    try {
      await connectToDB()
  
      const collections = await Collection.find().sort({ createdAt: "desc" })
  
      return NextResponse.json(collections, { status: 200 })
    } catch (err:any) {
      console.log("[collections_GET]", err.message)
      return new NextResponse(err.message,
      {
        status: 500 
      })
    }
  }
  
  export const dynamic = "force-dynamic";
  