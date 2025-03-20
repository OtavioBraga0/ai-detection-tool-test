export interface IAIDetection {
  uid: string;
  content: string;
  documentId: string;
}

export interface IAIDetectionDetails extends IAIDetection {
  status: string;
  result: number;
  result_details: {
    scoreGptZero: number;
    scoreOpenAI: number;
    scoreWriter: number;
    scoreCrossPlag: number;
    scoreCopyLeaks: number;
    scoreSapling: number;
    scoreContentAtScale: number;
    scoreZeroGPT: number;
    human: number;
  };
}

export enum ResultDetails {
  scoreGptZero = "GPTZero",
  scoreOpenAI = "OpenAI",
  scoreWriter = "Writer",
  scoreCrossPlag = "CrossPlag",
  scoreCopyLeaks = "CopyLeaks",
  scoreSapling = "Sapling",
  scoreContentAtScale = "ContentAtScale",
  scoreZeroGPT = "ZeroGPT",
  human = "Human",
}
