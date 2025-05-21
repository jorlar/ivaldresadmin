import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Rating,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { firestoreService } from "../services/databaseService";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface ActivityDocument {
  id: string;
  name: string;
  description: string;
  address: string;
  difficulty: string;
  duration: string;
  imageUrl: string;
  phone: string;
  priceRange: string;
  rating: number;
  season: string[];
  website: string;
}

interface EventDocument {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  phone: string;
  price: string;
  imageUrl: string;
  website: string;
}

interface HotelDocument {
  id: string;
  name: string;
  description: string;
  address: string;
  amenities: string[];
  imageUrl: string;
  openingHours: string;
  phone: string;
  priceRange: string;
}

interface RestaurantDocument {
  id: string;
  name: string;
  description: string;
  address: string;
  cuisine: string;
  imageUrl: string;
  openingHours: string;
  phone: string;
  priceRange: string;
  rating: number;
  website: string;
}

interface ShopDocument {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  imageUrl: string;
  openingHours: string;
  phone: string;
  website: string;
}

interface DocumentData {
  id: string;
  [key: string]: any;
}

const DIFFICULTY_OPTIONS = [
  "Easy",
  "Moderate",
  "Challenging",
  "Difficult",
  "Expert",
];
const SEASON_OPTIONS = ["Spring", "Summer", "Autumn", "Winter"];
const AMENITIES_OPTIONS = [
  "WiFi",
  "Parking",
  "Breakfast",
  "Restaurant",
  "Bar",
  "Swimming Pool",
  "Gym",
  "Spa",
  "Room Service",
  "Air Conditioning",
  "Pet Friendly",
  "Family Rooms",
  "Business Center",
  "Conference Rooms",
  "Laundry Service",
];

const CUISINE_OPTIONS = [
  "Norwegian",
  "Italian",
  "Asian",
  "Indian",
  "Mexican",
  "American",
  "French",
  "Mediterranean",
  "Seafood",
  "Vegetarian",
  "Vegan",
  "Fast Food",
  "Cafe",
  "Bakery",
  "Pizza",
  "Sushi",
  "Steakhouse",
  "Bar & Grill",
];

const SHOP_CATEGORY_OPTIONS = [
  "Clothing",
  "Souvenirs",
  "Gifts",
  "Outdoor Gear",
  "Sports Equipment",
  "Art & Crafts",
  "Books",
  "Jewelry",
  "Home Decor",
  "Food & Groceries",
  "Electronics",
  "Beauty & Health",
  "Toys",
  "Antiques",
  "Furniture",
  "Shoes",
  "Accessories",
  "Local Products",
];

const COLLECTIONS = ["activities", "events", "hotels", "restaurants", "shops"];

const DIFFICULTY_MAPPING: { [key: string]: string } = {
  Medium: "Moderate",
  "All levels": "Easy",
  Advanced: "Challenging",
  Beginner: "Easy",
  Intermediate: "Moderate",
  Expert: "Expert",
  Hard: "Difficult",
};

const Dashboard: React.FC = () => {
  console.log("Dashboard: Component mounting");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>(
    COLLECTIONS[0]
  );
  const [data, setData] = useState<any[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState<any>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  console.log("Dashboard: Component mounted");

  useEffect(() => {
    console.log("Dashboard: Initial useEffect running");
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Dashboard: Collection changed to:", selectedCollection);
    if (selectedCollection) {
      fetchCollectionData();
    }
  }, [selectedCollection]);

  const fetchCollectionData = async () => {
    console.log("Dashboard: Fetching collection data for:", selectedCollection);
    setLoading(true);
    try {
      const collectionData = await firestoreService.getCollection(
        selectedCollection
      );
      console.log("Dashboard: Collection data fetched:", collectionData);
      setData(collectionData);
    } catch (err) {
      console.error("Dashboard: Error fetching collection data:", err);
      setError("Failed to fetch collection data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("Dashboard: Logging out");
    try {
      await authService.logout();
      navigate("/login");
    } catch (err) {
      console.error("Dashboard: Error during logout:", err);
      setError("Failed to logout");
    }
  };

  const handleInputChange = (documentId: string, field: string, value: any) => {
    setData((prev: any[]) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, [field]: value } : doc
      )
    );
  };

  const handleSeasonChange = (documentId: string, seasons: string[]) => {
    handleInputChange(documentId, "season", seasons);
  };

  const handleAmenitiesChange = (documentId: string, amenities: string[]) => {
    handleInputChange(documentId, "amenities", amenities);
  };

  const handleSave = async () => {
    console.log("Dashboard: Starting save operation");
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (selectedCollection === "activities") {
        for (const doc of data) {
          if (!doc.name || !doc.description || !doc.address) {
            throw new Error(
              "Name, description, and address are required fields"
            );
          }
          if (doc.rating && (doc.rating < 0 || doc.rating > 5)) {
            throw new Error("Rating must be between 0 and 5");
          }
        }
      } else if (selectedCollection === "events") {
        for (const doc of data) {
          if (
            !doc.name ||
            !doc.description ||
            !doc.date ||
            !doc.time ||
            !doc.location ||
            !doc.organizer
          ) {
            throw new Error(
              "Name, description, date, time, location, and organizer are required fields"
            );
          }
        }
      } else if (selectedCollection === "hotels") {
        for (const doc of data) {
          if (!doc.name || !doc.description || !doc.address) {
            throw new Error(
              "Name, description, and address are required fields"
            );
          }
        }
      } else if (selectedCollection === "restaurants") {
        for (const doc of data) {
          if (!doc.name || !doc.description || !doc.address || !doc.cuisine) {
            throw new Error(
              "Name, description, address, and cuisine are required fields"
            );
          }
          if (doc.rating && (doc.rating < 0 || doc.rating > 5)) {
            throw new Error("Rating must be between 0 and 5");
          }
        }
      } else if (selectedCollection === "shops") {
        for (const doc of data) {
          if (!doc.name || !doc.description || !doc.address || !doc.category) {
            throw new Error(
              "Name, description, address, and category are required fields"
            );
          }
        }
      }

      console.log("Dashboard: Validation passed, updating documents");

      // Update all documents
      for (const doc of data) {
        // Remove the id field before saving to Firestore
        const { id, ...docData } = doc;
        console.log("Dashboard: Updating document:", { id, data: docData });
        await firestoreService.updateDocument(selectedCollection, id, docData);
      }

      console.log("Dashboard: All documents updated successfully");
      setSuccess("Data saved successfully");
      await fetchCollectionData();
    } catch (err: any) {
      console.error("Dashboard: Error saving data:", err);
      setError(err.message || "Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateDocument = async () => {
    console.log("Dashboard: Creating new document:", newDocument);
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields based on collection
      if (selectedCollection === "activities") {
        if (
          !newDocument.name ||
          !newDocument.description ||
          !newDocument.address
        ) {
          throw new Error("Name, description, and address are required fields");
        }
      } else if (selectedCollection === "events") {
        if (
          !newDocument.name ||
          !newDocument.description ||
          !newDocument.date ||
          !newDocument.time ||
          !newDocument.location ||
          !newDocument.organizer
        ) {
          throw new Error(
            "Name, description, date, time, location, and organizer are required fields"
          );
        }
      } else if (selectedCollection === "hotels") {
        if (
          !newDocument.name ||
          !newDocument.description ||
          !newDocument.address
        ) {
          throw new Error("Name, description, and address are required fields");
        }
      } else if (selectedCollection === "restaurants") {
        if (
          !newDocument.name ||
          !newDocument.description ||
          !newDocument.address ||
          !newDocument.cuisine
        ) {
          throw new Error(
            "Name, description, address, and cuisine are required fields"
          );
        }
      } else if (selectedCollection === "shops") {
        if (
          !newDocument.name ||
          !newDocument.description ||
          !newDocument.address ||
          !newDocument.category
        ) {
          throw new Error(
            "Name, description, address, and category are required fields"
          );
        }
      }

      await firestoreService.createDocument(selectedCollection, newDocument);
      console.log("Dashboard: Document created successfully");
      setSuccess("Document created successfully");
      setCreateDialogOpen(false);
      setNewDocument({});
      await fetchCollectionData();
    } catch (err: any) {
      console.error("Dashboard: Error creating document:", err);
      setError(err.message || "Failed to create document");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    console.log("Dashboard: Deleting document:", documentId);
    if (
      !window.confirm(
        "Are you sure you want to delete this document? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");
      setSuccess("");

      await firestoreService.deleteDocument(selectedCollection, documentId);
      console.log("Dashboard: Document deleted successfully");
      setSuccess("Document deleted successfully");
      await fetchCollectionData();
    } catch (err: any) {
      console.error("Dashboard: Error deleting document:", err);
      setError(err.message || "Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNewDocumentChange = (field: string, value: any) => {
    setNewDocument((prev: Record<string, any>) => ({
      ...prev,
      [field]: value,
    }));
  };

  const mapDifficulty = (difficulty: string): string => {
    return DIFFICULTY_MAPPING[difficulty] || "Easy";
  };

  const renderActivityFields = (doc: ActivityDocument) => {
    return (
      <>
        <TextField
          fullWidth
          required
          label='Name'
          value={doc.name || ""}
          onChange={(e) => handleInputChange(doc.id, "name", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Description'
          value={doc.description || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "description", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          required
          label='Address'
          value={doc.address || ""}
          onChange={(e) => handleInputChange(doc.id, "address", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <FormControl fullWidth margin='normal' size='small'>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={mapDifficulty(doc.difficulty || "")}
            label='Difficulty'
            onChange={(e) =>
              handleInputChange(doc.id, "difficulty", e.target.value)
            }>
            {DIFFICULTY_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Duration'
          value={doc.duration || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "duration", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., 2 hours'
        />
        <TextField
          fullWidth
          label='Image URL'
          value={doc.imageUrl || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "imageUrl", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
        <TextField
          fullWidth
          label='Phone'
          value={doc.phone || ""}
          onChange={(e) => handleInputChange(doc.id, "phone", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Price Range'
          value={doc.priceRange || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "priceRange", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., $10-50'
        />
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography component='legend'>Rating</Typography>
          <Rating
            value={doc.rating || 0}
            onChange={(_, value) => handleInputChange(doc.id, "rating", value)}
            precision={0.5}
          />
        </Box>
        <FormControl fullWidth margin='normal' size='small'>
          <InputLabel>Seasons</InputLabel>
          <Select
            multiple
            value={doc.season || []}
            label='Seasons'
            onChange={(e) =>
              handleSeasonChange(doc.id, e.target.value as string[])
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
            {SEASON_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Website'
          value={doc.website || ""}
          onChange={(e) => handleInputChange(doc.id, "website", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
      </>
    );
  };

  const renderEventFields = (doc: EventDocument) => {
    return (
      <>
        <TextField
          fullWidth
          required
          label='Name'
          value={doc.name || ""}
          onChange={(e) => handleInputChange(doc.id, "name", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Description'
          value={doc.description || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "description", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          required
          label='Date'
          value={doc.date || ""}
          onChange={(e) => handleInputChange(doc.id, "date", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='YYYY-MM-DD'
        />
        <TextField
          fullWidth
          required
          label='Time'
          value={doc.time || ""}
          onChange={(e) => handleInputChange(doc.id, "time", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='HH:MM'
        />
        <TextField
          fullWidth
          required
          label='Location'
          value={doc.location || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "location", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Organizer'
          value={doc.organizer || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "organizer", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Phone'
          value={doc.phone || ""}
          onChange={(e) => handleInputChange(doc.id, "phone", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Price'
          value={doc.price || ""}
          onChange={(e) => handleInputChange(doc.id, "price", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., $20 or Free'
        />
        <TextField
          fullWidth
          label='Image URL'
          value={doc.imageUrl || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "imageUrl", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
        <TextField
          fullWidth
          label='Website'
          value={doc.website || ""}
          onChange={(e) => handleInputChange(doc.id, "website", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
      </>
    );
  };

  const renderHotelFields = (doc: HotelDocument) => {
    return (
      <>
        <TextField
          fullWidth
          required
          label='Name'
          value={doc.name || ""}
          onChange={(e) => handleInputChange(doc.id, "name", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Description'
          value={doc.description || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "description", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          required
          label='Address'
          value={doc.address || ""}
          onChange={(e) => handleInputChange(doc.id, "address", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <FormControl fullWidth margin='normal' size='small'>
          <InputLabel>Amenities</InputLabel>
          <Select
            multiple
            value={doc.amenities || []}
            label='Amenities'
            onChange={(e) =>
              handleAmenitiesChange(doc.id, e.target.value as string[])
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
            {AMENITIES_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Image URL'
          value={doc.imageUrl || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "imageUrl", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
        <TextField
          fullWidth
          label='Opening Hours'
          value={doc.openingHours || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "openingHours", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., Mon-Fri: 8:00-22:00, Sat-Sun: 9:00-23:00'
        />
        <TextField
          fullWidth
          label='Phone'
          value={doc.phone || ""}
          onChange={(e) => handleInputChange(doc.id, "phone", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Price Range'
          value={doc.priceRange || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "priceRange", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., $100-300 per night'
        />
      </>
    );
  };

  const renderRestaurantFields = (doc: RestaurantDocument) => {
    return (
      <>
        <TextField
          fullWidth
          required
          label='Name'
          value={doc.name || ""}
          onChange={(e) => handleInputChange(doc.id, "name", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Description'
          value={doc.description || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "description", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          required
          label='Address'
          value={doc.address || ""}
          onChange={(e) => handleInputChange(doc.id, "address", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <FormControl fullWidth margin='normal' size='small'>
          <InputLabel>Cuisine</InputLabel>
          <Select
            value={doc.cuisine || ""}
            label='Cuisine'
            onChange={(e) =>
              handleInputChange(doc.id, "cuisine", e.target.value)
            }>
            {CUISINE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Image URL'
          value={doc.imageUrl || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "imageUrl", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
        <TextField
          fullWidth
          label='Opening Hours'
          value={doc.openingHours || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "openingHours", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., Mon-Fri: 11:00-22:00, Sat-Sun: 12:00-23:00'
        />
        <TextField
          fullWidth
          label='Phone'
          value={doc.phone || ""}
          onChange={(e) => handleInputChange(doc.id, "phone", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Price Range'
          value={doc.priceRange || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "priceRange", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., $$-$$$'
        />
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography component='legend'>Rating</Typography>
          <Rating
            value={doc.rating || 0}
            onChange={(_, value) => handleInputChange(doc.id, "rating", value)}
            precision={0.5}
          />
        </Box>
        <TextField
          fullWidth
          label='Website'
          value={doc.website || ""}
          onChange={(e) => handleInputChange(doc.id, "website", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
      </>
    );
  };

  const renderShopFields = (doc: ShopDocument) => {
    return (
      <>
        <TextField
          fullWidth
          required
          label='Name'
          value={doc.name || ""}
          onChange={(e) => handleInputChange(doc.id, "name", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          required
          label='Description'
          value={doc.description || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "description", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          required
          label='Address'
          value={doc.address || ""}
          onChange={(e) => handleInputChange(doc.id, "address", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <FormControl fullWidth margin='normal' size='small'>
          <InputLabel>Category</InputLabel>
          <Select
            value={doc.category || ""}
            label='Category'
            onChange={(e) =>
              handleInputChange(doc.id, "category", e.target.value)
            }>
            {SHOP_CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Image URL'
          value={doc.imageUrl || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "imageUrl", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
        <TextField
          fullWidth
          label='Opening Hours'
          value={doc.openingHours || ""}
          onChange={(e) =>
            handleInputChange(doc.id, "openingHours", e.target.value)
          }
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='e.g., Mon-Fri: 10:00-20:00, Sat: 10:00-18:00, Sun: 12:00-16:00'
        />
        <TextField
          fullWidth
          label='Phone'
          value={doc.phone || ""}
          onChange={(e) => handleInputChange(doc.id, "phone", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
        />
        <TextField
          fullWidth
          label='Website'
          value={doc.website || ""}
          onChange={(e) => handleInputChange(doc.id, "website", e.target.value)}
          margin='normal'
          variant='outlined'
          size='small'
          placeholder='https://...'
        />
      </>
    );
  };

  const renderFields = (doc: DocumentData) => {
    if (selectedCollection === "activities") {
      return renderActivityFields(doc as ActivityDocument);
    } else if (selectedCollection === "events") {
      return renderEventFields(doc as EventDocument);
    } else if (selectedCollection === "hotels") {
      return renderHotelFields(doc as HotelDocument);
    } else if (selectedCollection === "restaurants") {
      return renderRestaurantFields(doc as RestaurantDocument);
    } else if (selectedCollection === "shops") {
      return renderShopFields(doc as ShopDocument);
    }

    // Default rendering for other collections
    return Object.entries(doc).map(
      ([field, value]) =>
        field !== "id" && (
          <TextField
            key={field}
            fullWidth
            label={field}
            value={value || ""}
            onChange={(e) => handleInputChange(doc.id, field, e.target.value)}
            margin='normal'
            variant='outlined'
            size='small'
          />
        )
    );
  };

  const renderCreateDialog = () => {
    return (
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>Create New {selectedCollection.slice(0, -1)}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {selectedCollection === "activities" &&
              renderActivityFields(newDocument as ActivityDocument)}
            {selectedCollection === "events" &&
              renderEventFields(newDocument as EventDocument)}
            {selectedCollection === "hotels" &&
              renderHotelFields(newDocument as HotelDocument)}
            {selectedCollection === "restaurants" &&
              renderRestaurantFields(newDocument as RestaurantDocument)}
            {selectedCollection === "shops" &&
              renderShopFields(newDocument as ShopDocument)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateDocument}
            variant='contained'
            disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    console.log("Dashboard: Showing loading state");
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'>
        <CircularProgress />
      </Box>
    );
  }

  console.log("Dashboard: Rendering main content");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Firestore Editor
          </Typography>
          <IconButton color='inherit' onClick={handleLogout}>
            Logout
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity='success' sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Collection</InputLabel>
            <Select
              value={selectedCollection}
              label='Select Collection'
              onChange={(e) => {
                console.log("Dashboard: Collection selected:", e.target.value);
                setSelectedCollection(e.target.value);
              }}>
              {COLLECTIONS.map((collection) => (
                <MenuItem key={collection} value={collection}>
                  {collection.charAt(0).toUpperCase() + collection.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCollection && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}>
                <Typography variant='h5'>Edit {selectedCollection}</Typography>
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  onClick={() => setCreateDialogOpen(true)}>
                  Add New
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                {data.map((doc) => (
                  <Paper key={doc.id} sx={{ p: 2, mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}>
                      <Typography variant='subtitle1'>
                        Document ID: {doc.id}
                      </Typography>
                      <IconButton
                        color='error'
                        onClick={() => handleDeleteDocument(doc.id)}
                        disabled={isDeleting}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {renderFields(doc)}
                  </Paper>
                ))}
              </Box>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant='contained'
                  onClick={handleSave}
                  disabled={saving}
                  sx={{ minWidth: 120 }}>
                  {saving ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      {renderCreateDialog()}
    </Box>
  );
};

export default Dashboard;
