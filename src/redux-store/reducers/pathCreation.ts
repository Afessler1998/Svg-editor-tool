import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurveControlNode } from '../../utils/makeSvgElements/makePathCurveControl'
import { PathNode } from '../../utils/makeSvgElements/makePathNode'

export interface pathCreationState {
  nodeCount: number,
  pathNodes: Array<PathNode>,
  curveControlNodes: Array<CurveControlNode>,
  pathId: string,

}

const initialState: pathCreationState = {
  nodeCount: 0,
  pathNodes: [],
  curveControlNodes: [],
  pathId: "",
}

export const pathCreationStateSlice = createSlice({
  name: 'pathCreationState',
  initialState,
  reducers: {
    setNodeCount(state, action: PayloadAction<number>) {
        state.nodeCount = action.payload
    },
    setPathNodes(state, action: PayloadAction<Array<PathNode>>) {
        state.pathNodes = action.payload;
    },
    setCurveControlNodes(state, action: PayloadAction<Array<CurveControlNode>>) {
        state.curveControlNodes = action.payload;
    },
    setPathId(state, action: PayloadAction<string>) {
        state.pathId = action.payload;
    }
  },
})

export const { setNodeCount, setPathNodes, setCurveControlNodes, setPathId } = pathCreationStateSlice.actions

export default pathCreationStateSlice.reducer