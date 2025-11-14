'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import AllGamesCard from '@/components/AllGamesCard';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import OutletSelectionPopup from '@/components/OutletSelectionPopup';

// Game type interfaces based on API documentation
interface Game {
  id: number;
  name: string;
  category_id: number;
  category: string;
  type: string;
  bannerUrl: string;
  assetUrl: string;
  rating: number;
  durationMinutes: number;
  plays: number;
}

// Restaurant game format (for display purposes)
interface RestaurantGame {
  id: number;
  name: string;
  image: string;
  rating: number;
  action: string;
  duration: string;
  category: string;
  gameType?: string;
  location?: string;
  outlets?: string;
  discount?: string;
}

// Union type for games that can be displayed
type DisplayableGame = Game | RestaurantGame;

interface Category {
  id: number;
  name: string;
  slug: string;
  isForYou: boolean;
}

// Vendor/Restaurant interfaces
interface Vendor {
  id: number;
  name: string;
  logoUrl: string;
  location: {
    city: string;
    state: string;
  };
  outletsCount: number;
  activeOffers: number;
}

interface VendorsResponse {
  status: string;
  vendors: Vendor[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface GamesInitResponse {
  status: string;
  meta: {
    type: string;
    perPage: number;
  };
  categories: Category[];
  forYou: Game[];
}

interface GamesResponse {
  status: string;
  category: {
    id: number;
    name: string;
    slug: string;
    isForYou: boolean;
  };
  games: Game[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

const GamesPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [forYouGames, setForYouGames] = useState<Game[]>([]);
  const [currentGames, setCurrentGames] = useState<DisplayableGame[]>([]);
  const [restaurants, setRestaurants] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState<string>('');
  const [isOutletPopupOpen, setIsOutletPopupOpen] = useState(false);

  // Fetch initial data (categories + For You games + restaurants)
  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching initial games data...');
      
      // Fetch games data and restaurants data in parallel
      const [gamesResponse, restaurantsResponse] = await Promise.all([
        fetch('/api/public/games/init?type=Normal Game&perPage=12'),
        fetch('/api/public/vendors?perPage=12')
      ]);
      
      const gamesData: GamesInitResponse = await gamesResponse.json();
      const restaurantsData: VendorsResponse = await restaurantsResponse.json();
      
      console.log('Initial games data:', gamesData);
      console.log('Restaurants data:', restaurantsData);
      
      if (gamesData.status === 'success') {
        // Add restaurant category
        const restaurantCategory: Category = { 
          id: -1, 
          name: 'Restaurants', 
          slug: 'restaurants', 
          isForYou: false 
        };
        
        // Use categories directly from API and add restaurant category
        const allCategories = [...gamesData.categories, restaurantCategory];
        setCategories(allCategories);
        setForYouGames(gamesData.forYou);
        
        // Find the "For You" category from the API response
        const forYouCategory = gamesData.categories.find(cat => cat.isForYou) || gamesData.categories[0];
        
        setCurrentGames(gamesData.forYou);
        setCurrentCategory(forYouCategory);
        
        console.log('Categories loaded:', allCategories);
        console.log('For You games loaded:', gamesData.forYou);
      } else {
        setError('Failed to load games data');
      }
      
      if (restaurantsData.status === 'success') {
        setRestaurants(restaurantsData.vendors);
        console.log('Restaurants loaded:', restaurantsData.vendors);
      } else {
        console.warn('Failed to load restaurants data');
      }
    } catch (error) {
      console.error('Error fetching initial games data:', error);
      setError('Failed to load games data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch games for a specific category
  const fetchCategoryGames = useCallback(async (category: Category, page: number = 1, search: string = '') => {
    try {
      setIsLoadingGames(true);
      setError(null);
      
      console.log('Fetching games for category:', category, 'page:', page, 'search:', search);
      
      if (category.isForYou) {
        // For "For You" category, we already have the data
        setCurrentGames(forYouGames);
        setCurrentCategory(category);
        return;
      } else if (category.id === -1) {
        // For "Restaurants" category, show restaurants as games
        const restaurantGames: RestaurantGame[] = restaurants.map(restaurant => ({
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.logoUrl,
          rating: 4.5, // Default rating
          action: 'Restaurant',
          duration: `${restaurant.activeOffers} offers`,
          category: 'Restaurants',
          gameType: 'Restaurant',
          location: `${restaurant.location.city}, ${restaurant.location.state}`,
          outlets: `${restaurant.outletsCount} outlets`,
          discount: restaurant.activeOffers > 0 ? `${restaurant.activeOffers} offers` : undefined
        }));
        
        setCurrentGames(restaurantGames);
        setCurrentCategory(category);
        return;
      } else {
        // For regular game categories
        let apiUrl = '/api/public/games?';
        const params = new URLSearchParams();
        
        params.append('categoryId', category.id.toString());
        params.append('type', 'Normal Game');
        params.append('sort', 'popularity');
        params.append('page', page.toString());
        params.append('perPage', '12');
        
        if (search) {
          params.append('q', search);
        }
        
        apiUrl += params.toString();
        
        const response = await fetch(apiUrl);
        const data: GamesResponse = await response.json();
        
        console.log('Category games data:', data);
        
        if (data.status === 'success') {
          setCurrentGames(data.games);
          setCurrentCategory(data.category);
          
          console.log('Games loaded for category:', data.category.name, 'Count:', data.games.length);
        } else {
          setError('Failed to load games for this category');
        }
      }
    } catch (error) {
      console.error('Error fetching category games:', error);
      setError('Failed to load games for this category');
    } finally {
      setIsLoadingGames(false);
    }
  }, [forYouGames, restaurants]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchQuery(''); // Clear search when changing tabs
    
    if (categories[newValue]) {
      fetchCategoryGames(categories[newValue]);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentCategory) {
      fetchCategoryGames(currentCategory, 1, query);
    }
  };

  // Handle game click
  const handleGameClick = (gameId: number) => {
    console.log('Game clicked:', gameId);
    // Check if it's a restaurant (id will be negative or we can check current category)
    if (currentCategory?.id === -1) {
      // Find restaurant name from currentGames
      const restaurantGame = currentGames.find(g => g.id === gameId);
      const restaurantName = restaurantGame ? restaurantGame.name : '';
      
      // Open outlet selection popup
      setSelectedShopId(gameId);
      setSelectedRestaurantName(restaurantName);
      setIsOutletPopupOpen(true);
    } else {
      router.push(`/games/${gameId}`);
    }
  };

  const handleCloseOutletPopup = () => {
    setIsOutletPopupOpen(false);
    setSelectedShopId(null);
    setSelectedRestaurantName('');
  };

  // Load initial data on mount
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Preselect Restaurants tab if tab=restaurant is present
  useEffect(() => {
    if (!categories.length) return;
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && tabParam.toLowerCase() === 'restaurant') {
      const idx = categories.findIndex(c => c.slug === 'restaurants' || c.name.toLowerCase() === 'restaurants');
      if (idx >= 0) {
        setActiveTab(idx);
        fetchCategoryGames(categories[idx]);
      }
    }
  }, [categories, fetchCategoryGames]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px', // Counteract global padding
        }}
      >
         <Header 
        sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }} 
      />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: 4,
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <TabBar />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          margin: '0 -15px', // Counteract global padding
        }}
      >
          <Header 
        sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }} 
      />
        <Box sx={{ padding: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
        <TabBar />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        paddingBottom: '80px', // Space for TabBar
        margin: '0 -15px', // Counteract global padding
      }}
    >
       <Header 
        sx={{
          backgroundColor: '#4848DB',
          textAlign: 'center',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }} 
      />
      
      <Box sx={{ padding: 2 }}>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
        
        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '16px', 
                fontWeight: 700,
                minWidth: 'auto',
                px: 2,
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category.id}
                label={category.name}
                sx={{
                  color: activeTab === index ? '#21175B' : '#21175B',
                  borderBottom: activeTab === index ? '2px solid #21175B' : 'none',
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Games Content */}
        <Box>
          {isLoadingGames ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4,
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <>
              {/* Category Header */}
              {currentCategory && (
                <Box sx={{ mb: 2 }}>
                  {/* <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    {currentCategory.name}
                    {searchQuery && ` - Search: "${searchQuery}"`}
                  </Typography> */}
                  {/* <Typography variant="body2" color="text.secondary">
                    {pagination.total} games found
                  </Typography> */}
                  
                </Box>
              )}

              {/* Games Grid or Restaurant List */}
              {currentGames.length > 0 ? (
                // Check if current category is Restaurants
                currentCategory?.id === -1 ? (
                  // Restaurant List Layout
                  <Box sx={{ px: 2 }}>
                    {currentGames.map((game) => {
                      const restaurantGame = game as RestaurantGame;
                      return (
                        <Box
                          key={game.id}
                          onClick={() => handleGameClick(game.id)}
                          sx={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            p: 2,
                            mb: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            },
                          }}
                        >
                          {/* Restaurant Logo */}
                          <Box
                            sx={{
                              width: '100%',
                              height: '200px',
                              backgroundColor: '#f0f0f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2,
                              overflow: 'hidden',
                              borderRadius: '8px',
                            }}
                          >
                            <img
                              src={restaurantGame.image}
                              alt={restaurantGame.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>

                          {/* Restaurant Title */}
                          <Typography
                            sx={{
                              fontSize: '18px',
                              fontWeight: 700,
                              color: '#333',
                              mb: 0.5
                            }}
                          >
                            {restaurantGame.name}
                          </Typography>

                          {/* Restaurant Type */}
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              color: '#666',
                              mb: 2
                            }}
                          >
                            {restaurantGame.gameType || restaurantGame.action}
                          </Typography>

                          {/* Details Row */}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                            {restaurantGame.location && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography sx={{ fontSize: '12px', color: '#888' }}>📍</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#666' }}>{restaurantGame.location}</Typography>
                              </Box>
                            )}
                            
                            {restaurantGame.outlets && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography sx={{ fontSize: '12px', color: '#888' }}>🍽️</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#666' }}>{restaurantGame.outlets}</Typography>
                              </Box>
                            )}
                            
                            {restaurantGame.discount && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography sx={{ fontSize: '12px', color: '#888' }}>%</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#666' }}>{restaurantGame.discount}</Typography>
                              </Box>
                            )}
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography sx={{ fontSize: '12px', color: '#FFD700' }}>⭐</Typography>
                              <Typography sx={{ fontSize: '12px', color: '#666', fontWeight: 600 }}>{restaurantGame.rating}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  // Regular Games Grid Layout
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(4, 1fr)',
                        lg: 'repeat(5, 1fr)',
                      },
                      gap: 2,
                    }}
                  >
                    {currentGames.map((game) => {
                      // Type guard to check if it's a RestaurantGame
                      const isRestaurantGame = (g: DisplayableGame): g is RestaurantGame => {
                        return 'image' in g && 'action' in g && 'duration' in g;
                      };
                      
                      const image = isRestaurantGame(game) ? game.image : game.bannerUrl;
                      const action = isRestaurantGame(game) ? game.action : game.type;
                      const duration = isRestaurantGame(game) ? game.duration : `${game.durationMinutes} min`;
                      
                      return (
                        <AllGamesCard
                          key={game.id}
                          id={game.id}
                          name={game.name}
                          image={image}
                          rating={game.rating}
                          action={action}
                          duration={duration}
                          onClick={() => handleGameClick(game.id)}
                        />
                      );
                    })}
                  </Box>
                )
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No games found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery 
                      ? `No games found for "${searchQuery}"`
                      : 'No games available in this category'
                    }
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      <TabBar />

      {/* Outlet Selection Popup */}
      {selectedShopId && (
        <OutletSelectionPopup
          isOpen={isOutletPopupOpen}
          onClose={handleCloseOutletPopup}
          shopId={selectedShopId}
          restaurantName={selectedRestaurantName}
        />
      )}
    </Box>
  );
};

export default GamesPage;