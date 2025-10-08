'use client';

import { useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search games...',
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 3,
        px: 2,
        py: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        mb: 2,
      }}
    >
      <SearchIcon sx={{ color: '#888', mr: 1 }} />
      <InputBase
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          flex: 1,
          fontSize: { xs: 14, sm: 16 },
          color: '#2d2350',
          '& ::placeholder': {
            color: '#888',
            opacity: 1,
          },
        }}
      />
      {searchQuery && (
        <IconButton
          size="small"
          onClick={handleClear}
          sx={{
            color: '#888',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.05)',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;
