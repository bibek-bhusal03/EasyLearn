from langchain_postgres.v2.indexes import DistanceStrategy
print(dir(DistanceStrategy))
# or better:
for member in dir(DistanceStrategy):
    if not member.startswith('_'):
        print(member)