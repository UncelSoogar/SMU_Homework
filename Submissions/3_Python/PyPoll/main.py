#Read and open polling data
import csv

with open(r"PyPoll\Resources\election_data.csv") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    #remove header
    csv_header = next(csvreader)

#create dictionaries to reference for calcs
    voterid = []
    #county = []
    candidate= []
    uniquename = []
    uniquevotes= []
    
    for row in csvreader:
        voterid.append(row[0])
        #county.append(row[1])
        candidate.append(row[2])
    
#calc total votes
    tvotes = len(voterid)

#separate and count each candidate
    #find unique names
    for _ in candidate:
        if _ not in uniquename: 
            uniquename.append(_) 
#find counts for each candidate and assign to uniquevotes
    for i in range(len(uniquename)):
        uniquevotes.append(candidate.count(uniquename[i]))
#find max value and index to recall winning name
    winner = uniquevotes.index(max(uniquevotes))



# #print to terminal
    print("Election Results")
    print("******************************************")
    print(f"Total votes: {tvotes}")
    print("******************************************")
    #loop for each candidate
    for i in range(len(uniquename)):
        print(f"{uniquename[i]} won {round(100* uniquevotes[i] / tvotes, 2)}% ({uniquevotes[i]}) of the vote.")
    print("******************************************")
    print(f"{uniquename[winner]} wins the election with {uniquevotes[winner]} votes!")

# #write calcs to .txt
    outputtxt = open(r"PyPoll\ElectionResults.txt", "w")

    outputtxt.write("Election Results \n")
    outputtxt.write("****************************************** \n")
    outputtxt.write(f"Total votes: {tvotes} \n")
    outputtxt.write("****************************************** \n")
    #loop for each candidate
    for i in range(len(uniquename)):
        outputtxt.write(f"{uniquename[i]} won {round(100* uniquevotes[i] / tvotes, 2)}% ({uniquevotes[i]}) of the vote. \n")
    outputtxt.write("****************************************** \n")
    outputtxt.write(f"{uniquename[winner]} wins the election with {uniquevotes[winner]} votes!")