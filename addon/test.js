

function simpleVote(candidates)
    set classWeight = {}, max = 0, electedClass = null
    for candidate c in candidates do
        if classWeight[c.alias] is defined
           classWeight[c.alias]++;
        else
           classWeight[c.alias] = 0

        if frequency[c.alias] > max
           max = classWeight[c.alias]
           electedCandidate = c.alias
    
    return electedClass




function distanceBasedVote(candidates)
    set classWeight = {}, max = 0, electedClass = null
    for candidate c in candidates do
        if classWeight[c.alias] is defined
           classWeight[c.alias] = classWeight[c.alias] + (1/pow(c.distance, 2))
        else
           classWeight[c.alias] = 0 


        if classWeight[c.alias] > max
           max = classWeight[c.alias]
           electedClass = c.alias
    
    return electedClass




function userBiasBasedVote(candidates)
    set frequency = {}, max = 0, electedClass = null
    for candidate c in candidates do
        if classWeight[c.alias] is defined
           classWeight[c.alias] = classWeight[c.alias] + 
                 (1/pow(c.distance, 2)) + 
                 (c.isTraining * uteBias)
        else
           classWeight[c.alias] = 0 


        if classWeight[c.alias] > max
           max = classWeight[c.alias]
           electedClass = c.alias
    
    return electedClass



function reputationBasedVote(candidates)
    set classWeight = {}, max = 0, electedClass = null, electedCandidate = null
    for candidate c in candidates do
        if classWeight[c.alias] is defined
           classWeight[c.alias] = classWeight[c.alias] + 
               (1/pow(c.distance, 2)) + 
               (c.reputation/numberOfInquiries)
        else
           classWeight[c.alias] = 0 


        if classWeight[c.alias] > max
           max = classWeight[c.alias]
           electedCandidate = c

    electedCandidate.reputation++;       
    
    return electedCandidate.alias