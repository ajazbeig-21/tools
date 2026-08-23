from sentence_transformers import SentenceTransformer

# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

sentence1 = "I love dogs"
sentence2 = "I really like puppies"

# Convert text → vectors
vector1 = model.encode(sentence1)
vector2 = model.encode(sentence2)

print("Sentence 1:")
print(sentence1)

print("\nVector 1:")
print(vector1)

print("\nSentence 2:")
print(sentence2)

print("\nVector 2:")
print(vector2)

print("\nVector 1 dimensions:", len(vector1))
print("Vector 2 dimensions:", len(vector2))
