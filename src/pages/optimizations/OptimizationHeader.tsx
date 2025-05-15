import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Popover, Text } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes'
import React, { useState, useCallback } from 'react'
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

const OptimizationHeader = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleSearch = useCallback(debounce(async (query: string) => {
        if (!query) {
            setSearchResults([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/manage-alerts-v2/get-alert-by-query?title=${query}`);
            const data = await response.json();
            if (data.success) {
                setSearchResults(data.alerts.map((alert: any) => ({ id: alert._id, title: alert.title })));
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error fetching alerts:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    }, 300), []); // 300ms debounce delay

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };
    const handleAlertClick = (id: string) => {
        router.push(`/optimizations/${id}`);
    }
    return (
        <Box className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Search Input Field - 8 columns on larger screens, full width on smaller screens */}
            <Box className="sm:col-span-2 relative ml-1 ">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Box className="flex items-center justify-between bg-[#1A1A1A] text-xs sm:text-sm text-white rounded-full px-6 sm:px-4 py-2 cursor-pointer">
                            <Box className="flex items-center gap-4">
                                <svg
                                    width="14"
                                    className="mr-2"
                                    height="10"
                                    viewBox="0 0 14 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.572266"
                                        y="0.5"
                                        width="12.8571"
                                        height="1.28571"
                                        rx="0.642857"
                                        fill="#3EC4A1"
                                    />
                                    <rect
                                        x="1.85742"
                                        y="3.07227"
                                        width="10.2857"
                                        height="1.28571"
                                        rx="0.642857"
                                        fill="#3EC4A1"
                                    />
                                    <rect
                                        x="3.14453"
                                        y="5.64258"
                                        width="7.71429"
                                        height="1.28571"
                                        rx="0.642857"
                                        fill="#3EC4A1"
                                    />
                                    <rect
                                        x="4.42969"
                                        y="8.21484"
                                        width="5.14286"
                                        height="1.28571"
                                        rx="0.642857"
                                        fill="#3EC4A1"
                                    />
                                </svg>
                                Filter
                            </Box>
                            <DropdownMenu.TriggerIcon className="mr-4 text-gray-500 font-bold" />
                        </Box>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item shortcut="⌘ F">45 days</DropdownMenu.Item>
                        <DropdownMenu.Item shortcut="⌘ E">60 days</DropdownMenu.Item>
                        <DropdownMenu.Item shortcut="⌘ D">90 days</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Box>
            <Box className="sm:col-span-8 relative ml-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <Popover.Trigger>
                        <input
                            type="text"
                            placeholder="Search alerts..."
                            className="w-full text-white placeholder-gray-400 bg-[#1A1A1A] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#3EC4A1]"
                            value={query}
                            onFocus={() => setIsPopoverOpen(true)} // Open popover on focus
                            onBlur={() => setIsPopoverOpen(false)} // Close popover on blur
                            onChange={handleInputChange}
                        />
                    </Popover.Trigger>
                    <Popover.Content className="bg-[#1A1A1A] text-white rounded-lg p-4 mt-2 shadow-lg">
                        {searchResults.length > 0 && !isLoading ? (
                            searchResults.map((alert: any) => (
                                <Box key={alert._id} className="mb-2" onClick={() => handleAlertClick(alert.id)}>
                                    <Box className="font-play cursor-pointer">{alert.title}</Box>
                                </Box>
                            ))
                        ) : isLoading ? (
                            <Text size="2">Loading...</Text>
                        ) : query.length > 0 && searchResults.length === 0 ? (
                            <Text size="2">No alerts found</Text>
                        ) : (
                            <Text size="2">Type to search alerts</Text>
                        )}
                    </Popover.Content>
                </Popover.Root>
            </Box>
        </Box>
    )
}

export default OptimizationHeader