import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Data } from './../models/data.model.js';

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong!")
    }
}

const registerUser = asyncHandler( async(req, res) => {
    const { username, fullName, password, email } = req.body;
    if(
        [ username, fullName, password, email].some( (field) =>
        field === undefined || field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required.")
        }

        const existedUser = await User.findOne({
            $or: [ {username}, {email}]
        })

        if(existedUser){
            throw new ApiError(409, "Username or email already exists.")
        }

        const user = await User.create({
            fullName,
            email,
            password,
            username: username.toLowerCase(),
        })

        const newUser = await User.findById(user._id).select(" --password --refreshToken")
        if(!newUser){
            throw new ApiError(500, "Something went wrong, while registering user.")
        }

        return res
        .status(201)
        .json( new ApiResponse(200, newUser, "User registered successfully!"))
})

const loginUser = asyncHandler( async(req, res) => {
    const {username, email, password} = req.body;

    if(!(username  || email)){
        throw new ApiError(404, "Username or email required!")
    }

    const user = await User.findOne({
        $or: [ {username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User does not exist!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials!")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).
    select(" --password --refreshToken ")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
        "User Logged in successfully."
        )
    )
})

const getCurrentUser = asyncHandler( async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,
        req.user,
        "Current user retrieved successfully!"
    ))
})

const getSector = asyncHandler( async(req, res) => {
    try {
        const documents = await Data.find();
        const sectorCounts = {};

        documents.forEach(doc => {
        let sector = doc.sector || "NA";
        sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
        });

        const sectorPercentages = [];
        for (let sector in sectorCounts) {
            const percentage = ((sectorCounts[sector] / documents.length) * 100).toFixed(2);
            sectorPercentages.push({ sector: sector, percentage: percentage });
        }

        return res.json(sectorPercentages)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getIntensity = asyncHandler( async(req, res) => {
    try {
        const documents = await Data.find();
        const intensityCounts = {};

        documents.forEach(doc => {
        let intensity = doc.intensity || "NA";
        intensityCounts[intensity] = (intensityCounts[intensity] || 0) + 1;
        });

        const Intensity = [];
        for (let intensity in intensityCounts){
            Intensity.push({intensity: intensity, intensity_Counts: intensityCounts[intensity]})
        }
        return res.json(Intensity)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getYear = asyncHandler( async(req, res) => {
    try {
        const documents = await Data.find();
        const yearCounts = {};

        documents.forEach(doc => {
        let year = doc.start_year || "NA";
        yearCounts[year] = (yearCounts[year] || 0) + 1;
        });

        const startYear = [];
        for (let year in yearCounts){
            startYear.push({year: year, yearCounts: yearCounts[year]})
        }
        return res.json(startYear)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const getPestle = asyncHandler( async(req, res) => {
    try {
        const documents = await Data.find();
        const pestleCounts = {};

        documents.forEach(doc => {
        let pestle = doc.pestle || "NA";
        pestleCounts[pestle] = (pestleCounts[pestle] || 0) + 1;
        });

        const pestle_counts = [];
        for (let pestle in pestleCounts){
            pestle_counts.push({pestle: pestle, pestleCounts: pestleCounts[pestle]})
        }
        return res.json(pestle_counts)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const getCountry = asyncHandler( async(req, res) => {
    try {
        const documents = await Data.find();
        const countryCounts = {};

        documents.forEach(doc => {
        let country = doc.country || "NA";
        countryCounts[country] = (countryCounts[country] || 0) + 1;
        });

        const country_counts = [];
        for (let country in countryCounts){
            country_counts.push({country: country, countryCounts: countryCounts[country]})
        }
        return res.json(country_counts)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const logoutUser = asyncHandler( async(req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options ={
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully."))
})

const deleteUser = asyncHandler(async(req, res) => {
    await User.findByIdAndDelete(req.user._id)

    const options ={
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Deleted successfully."))
})


export {
    registerUser,
    loginUser,
    generateAccessAndRefreshToken,
    getCurrentUser,
    getIntensity,
    getYear,
    getPestle,
    getCountry,
    getSector,
    logoutUser,
    deleteUser
}