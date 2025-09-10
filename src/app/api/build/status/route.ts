import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for build status (in production, use a database)
const buildStatusStore = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const buildId = searchParams.get('buildId')

    if (!buildId) {
      return NextResponse.json(
        { error: 'Build ID is required' },
        { status: 400 }
      )
    }

    const status = buildStatusStore.get(buildId)
    
    if (!status) {
      return NextResponse.json(
        { error: 'Build not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to get build status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { buildId, status, progress, message } = await request.json()

    if (!buildId || !status) {
      return NextResponse.json(
        { error: 'Build ID and status are required' },
        { status: 400 }
      )
    }

    const buildStatus = {
      buildId,
      status, // 'building', 'completed', 'error'
      progress: progress || 0,
      message: message || '',
      timestamp: new Date().toISOString(),
      ...buildStatusStore.get(buildId) // Preserve existing data
    }

    buildStatusStore.set(buildId, buildStatus)

    return NextResponse.json({ success: true, buildStatus })
  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update build status' },
      { status: 500 }
    )
  }
}