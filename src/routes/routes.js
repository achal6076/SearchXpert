import express from 'express'
import { autoComplete, logSearch } from '../controllers/search.js'

const router = express.Router()

router.get('/autocomplete', autoComplete) // Route for Searching
router.post('/search', logSearch) // Route for inserting Data into DB

export default router