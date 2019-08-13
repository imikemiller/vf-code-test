# Vodafone coding challenge

## Assumptions
1) That state = "error" cannot preceed the state = "processing"
2) That state = "success" cannot preceed the state = "processing"
3) That multiple processing states can be chained
4) That the chain of states will always complete with state = "error" or state="success" but never with both
5) That if state=="success" then errorCode will be either "not defined", "undefined" or "null"