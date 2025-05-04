// src/services/cardService.js
import axios from "axios";
import { API_URL } from "../config"; // Assuming you have a config file with API_URL

const cardService = {
  // Get all cards for a specific deck
  getCards: async (deckId) => {
    try {
      const response = await axios.get(`${API_URL}/cards/decks/${deckId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch cards" };
    }
  },

  // Create a new card
  createCard: async (cardData) => {
    try {
      const response = await axios.post(`${API_URL}/cards`, cardData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create card" };
    }
  },

  // Update an existing card
  updateCard: async (cardId, cardData) => {
    try {
      const response = await axios.put(`${API_URL}/cards/${cardId}`, cardData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update card" };
    }
  },

  // Delete a card
  deleteCard: async (cardId) => {
    try {
      const response = await axios.delete(`${API_URL}/cards/${cardId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete card" };
    }
  },
};

export default cardService;
