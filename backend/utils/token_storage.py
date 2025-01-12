from cachetools import TTLCache

# Token storage with 10-minute expiration
verification_tokens = TTLCache(maxsize=100, ttl=600)